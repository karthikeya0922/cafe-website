# Fire Pot — Angular SPA (Weeks 12–14)

A single-page version of the Fire Pot cafe site, built with **Angular 22**: standalone components, signals and zoneless change detection.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/
```

## Routes

| Path | Page | Shows |
|------|------|-------|
| `/` | Home | Featured items from `MenuService` |
| `/menu` | Menu | Search, category filter, veg toggle, cart sidebar |
| `/menu/:id` | Item detail | Route parameter bound to a component input |
| `/cart` | Cart | Shared `CartService` state |
| `/checkout` | Checkout | **Reactive form**, protected by `cartNotEmptyGuard`, lazy loaded |
| `/orders/:id` | Order confirmation | Programmatic navigation after checkout |
| `/reserve` | Reserve a table | **Template-driven form**, lazy loaded |
| `**` | 404 | Wildcard route |

## Where each topic lives

| Topic | Files |
|-------|-------|
| Components and inputs/outputs | `components/header`, `menu-card`, `menu-list`, `cart-summary` |
| Interpolation, property, event and two-way binding | `header.html`, `menu-card.html`, `menu-list.html` |
| Built-in directives | `@if` / `@for` / `@switch`, `[ngClass]`, `[ngStyle]` |
| Custom directive | `directives/highlight.ts` (`appHighlight`) |
| Services and dependency injection | `services/menu.service.ts` (HttpClient), `cart.service.ts`, `order.service.ts` |
| Routing | `app.routes.ts`, `guards/cart-not-empty.ts` |
| Reactive form | `pages/checkout` (FormBuilder, built-in and custom validators, conditional validation) |
| Template-driven form | `pages/reservation` (`ngModel`, `#ref="ngModel"`, `NgForm`) |

Menu data is loaded over HTTP from `public/menu-data.json`.
