# morten.broesby.dk

This repository contains the code for my website & blog.

![Website](https://img.shields.io/website?url=https%3A%2F%2Fmorten-website-blog.vercel.app)
![Vercel](https://vercelbadge.vercel.app/api/mortenbroesby/website-blog)
[![Repo status](https://www.repostatus.org/badges/latest/active.svg)](./README)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/mortenbroesby/website-blog/graphs/commit-activity)
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## 💻 Frameworks

### ⚡️ Turborepo

Turborepo is a high-performance development tool that simplifies development. It offers lightning-fast performance, effortless monorepo management, easy dependency management, flexible deployment options, and a comprehensive toolset.

#### ⚡️ Lightning-fast performance

Turbocharge your development process with advanced caching and parallel processing, reducing build times and improving overall performance.

#### 💪 Effortless monorepo management

Simplify handling of multiple interconnected apps or packages by managing them all in a single repository.

### 🔍 Next.js

This website is built on top of Next.js.

I chose Next.js as it provides a great developer experience with all the features i needed.
Hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.

---

## 📡 Hosting

I deploy and host this blog on Vercel.

They say it best on their website:

> Vercel is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.
> They provide a frictionless developer experience to take care of the hard things: deploying instantly, scaling automatically, and serving personalized content around the globe.
> They make it easy to develop, preview, and ship delightful user experiences, where performance is the default.

You can see it running on the following URL:

[https://morten-website-blog.vercel.app/](https://morten-website-blog.vercel.app/)

---

## ⚡️ Typescript

Developers spend most of their time in some IDE’s (integrated development environment e.g. WebStorm) or more lightweight code editors like VSCode. Of course, all code could be written in a simple notepad, but that would be painful and would take far much more time. We use IDEs to make our lives easier and work faster.

Below is a non-exhaustive list of reasons to use Typescript.

### Code auto-completion

In static type languages IDE, code auto-completion is just faster and works more confidently. Again, you don’t have to dig into documentation because of code hints.

### Real-time type checking

When you have an object in JavaScript, you can access every property of that object even if it doesn’t exist (in which case it will just be “undefined”). As you can imagine, this can lead to errors that are difficult to debug. In Typescript, your IDE tells you in real-time that you are trying to access something that doesn’t exist.

### Easier code refactor

Refactoring code in IDE is much easier in Typescript – it works way better than in vanilla Javascript. Sometimes a “wrongly“ named variable in JS can break your refactoring. With Typescript it’s easier for the code editor to find particular, connected variables, functions, classes etc. so it just works more reliably.

---

## 🏡 Architecture

The architecture in this repository is inspired by ["Elegant Frontend Architecture"](https://michalzalecki.com/elegant-frontend-architecture/).

---

## 👏 Credits

- Lee Robinson - [link](https://leerob.io/)
- Taxonomy - [github](https://github.com/shadcn/taxonomy)
- Turborepo Boilerplate - [github](https://github.com/mkosir/turborepo-boilerplate)

---

## 👨‍⚖️ License

Licensed under the MIT License, Copyright © 2021-present Morten Broesby-Olsen.

See [LICENSE](./LICENSE) for more information.
