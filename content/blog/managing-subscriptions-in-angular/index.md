---
title: Managing subscriptions in Angular
date: '2019-12-10T12:13:45.573Z'
---

Observables are everywhere in Angular and a lot of stuff operates using them. In fact **they are used to know when and what to do**.

Before jumping in the main subject let's define the Subscription. A Subscription represents the connection between an Observable and an Observer. It's an object that **holds the Observable execution**.

![Subscription schema](./subscription.png)

By default Observables are lazy, which means they don't produce any value before the system `.subscribe()` to them. Once the system subscribes, the Observable can start pushing values to the connected Observer.

As we usually do with event listeners or `setInterval()` function, the Observable execution needs to be stopped to avoid memory leaks. The Subscription has one important method `.unsubscribe()` that disposes the resource.

We usually think that memory leaks are hidden and imperceptible. It's completely wrong, in the real world the application becomes quickly unusable before it crashes. This problem directly affects final users and results in a poor experience.

![Beer leak](./beer.gif)

## Concretely in Angular

There are many ways to manage Subscriptions in Angular. The following example uses a `BookService` which exposes a long-lived Observable `availableBooks$` that emits available books in real time.

Next to this imagine we want to display this list and automatically update the view whenever the Observable emits a change in the books list.

#### 👎🏼 Common pitfall

Let's start by the bad way, this implementation has a memory leak.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // highlight-start
    this.bookService.availableBooks$.subscribe(list => { // <- memory leak
      // highlight-end
      this.books = list;
    });
  }
}
```

The Observable keeps running forever in the background even when the component is destroyed. Each time component is recreated the leak becomes bigger.

#### 👍🏼 Referenced Subscription

To avoid memory leaks the most common approach is using a Subscription reference.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
        {{ book.title }}
      </li>
    </ul>
  `,
})
// highlight-start
export class BookListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  // highlight-end

  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // highlight-start
    this._subscription = this.bookService.availableBooks$.subscribe(books => {
      // highlight-end
      this.books = books;
    });
  }

  // highlight-start
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  // highlight-end
}
```

Here the Subscription is manually managed and requires some extra work from the developer. Moreover this implementation looses the reactivity in favor of imperative programming with side-effects which is exactly what we want to avoid.

#### 👍🏼👍🏼 private subject + takeUntil

An other approach is to use a `Subject` to notify whenever the component is destroyed in combination with `takeUntil` operator to cleanup the Observable execution.

```ts
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>(); // highlight-line

  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.availableBooks$
      .pipe(
        tap(books => {
          this.books = books;
        }),
        takeUntil(this._destroy$) // highlight-line
      )
      .subscribe();
  }

  // highlight-start
  ngOnDestroy(): void {
    this._destroy$.next();
  }
  // highlight-end
}
```

Note that we don't need to call `this._destroy$.complete()` when component is destroyed because a Subject with no subscriber is just a function.

This implementation still needs some extra logic to cleanup the Observable execution but we can handle many Subscriptions using one single operator.

#### 👍🏼👍🏼👍🏼 Async pipe

Angular natively comes with the powerful `async` pipe to manage view Subscriptions effortlessly.

- No extraneous component property.
- Automated subscription management.

```ts
@Component({
  selector: 'book-list',
  template: `
    // highlight-start
    <ul *ngIf="books$ | async as books">
      <li *ngFor="let book of books">
        // highlight-end
        {{ book.title }}
      </li>
    </ul>
  `,
})
export class BookListComponent {
  // highlight-start
  books$: Observable<Book[]> = this.bookService.availableBooks$;
  // highlight-end

  constructor(private bookService: BookService) {}
}
```

This approach removes a lot of code and looks significantly better. It's important to minimize view subscriptions using the `as` keyword.

Sometimes we need more than one Subscription in the view context. In this case instead of doing this imbrication.

```html
<ng-container *ngIf="book$ | async as book">
  <div *ngIf="category$ | async as category">
    {{ book.title }} {{ category.name }}
  </div>
</ng-container>
```

Consider the following for readability.

```html
<div *ngIf="{ book: book$ | async, category: category$ | async } as vm">
  {{ vm.book.title }} {{ vm.category.name }}
</div>
```

Or even better, you can combine streams in the component using operators and subscribe to one Observable in the view.

```ts
@Component({
  selector: 'book-list',
  template: `
    <div *ngIf="bookWithCategory$ | async as vm">
      {{ vm.book.title }} {{ vm.category.name }}
    </div>
  `,
})
export class BookListComponent {
  // highlight-start
  bookWithCategory$ = combineLatest([ // <- Combine book and category
    this.bookService.book$,
    this.categoryService.category$,
  ]).pipe(
    map(([book, category]) => ({ // <- Map to an object for convenience
      book,
      category,
    }))
  );
  // highlight-end

  /* ... */
}
```

#### 👍🏼👍🏼👍🏼 Operator + Decorator (voodoo magic)

An other way to manage Subscriptions is to use a dedicated operator or decorator or both. There are a bunch of libraries offering these kind of utils such as:

- [Mindspace-io rxjs-utils](https://github.com/ThomasBurleson/mindspace-utils/blob/master/lib/utils/src/lib/rxjs/README.md)
- [Wishtack Rx-Scavenger](https://github.com/wishtack/wishtack-steroids/tree/master/packages/rx-scavenger)
- [Ngneat until-destroy](https://github.com/ngneat/until-destroy)

In this example I used the `@ngneat/until-destroy` library. I also introduced the `OnPush` change detection strategy to show you a more advanced code example with performance in mind.

```ts
@UntilDestroy() // highlight-line
@Component({
  selector: 'book-list',
  template: `
    <ul *ngIf="books.length">
      <li *ngFor="let book of books">
        {{ book.title }}
      </li>
    </ul>
  `,
  // highlight-start
  changeDetection: ChangeDetectionStrategy.OnPush,
  // highlight-end
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef // highlight-line
  ) {}

  ngOnInit(): void {
    this.books
      .pipe(
        // highlight-start
        tap(books => (this.books = books)),
        tap(() => this.cdr.markForCheck()),
        untilDestroyed(this)
        // highlight-end
      )
      .subscribe();
  }
}
```

Using this annotation we don't care about subscriptions anymore, which is good to avoid doing mistakes. The decorator manage the subscription for us.

## Some best practices to follow

// @todo add examples

- Avoid nested subscribes.
- Avoid code in constructor.
- Avoid logic in `.subscribe()`.
- Avoid subscription in services.
- Use `books$ | async as books` to minimize view subscriptions.
- Delegate Subscriptions management as much as you can.

`oembed: https://twitter.com/Michael_Hladky/status/1180316203937681410`

I will close this post with this smart quote from Michael Hladky. I strongly suggest you to follow this guy if you're interested in the Reactive X world, he's consistently publishing interesting stuff.