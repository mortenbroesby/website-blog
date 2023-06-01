# morten.broesby.dk

This repository contains the code for my website & blog.

![Website](https://img.shields.io/website?url=https%3A%2F%2Fmorten-website-blog.vercel.app)
![Vercel](https://vercelbadge.vercel.app/api/mortenbroesby/website-blog)
[![Repo status](https://www.repostatus.org/badges/latest/active.svg)](./README)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/mortenbroesby/website-blog/graphs/commit-activity)
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## 💻 Frameworks

### 🚀 Turborepo

This is why I chose Turborepo:

Turborepo is an incredible development tool that streamlines the entire development process.
It brings you unparalleled speed, effortless management of monorepos, simplified dependency handling, versatile deployment choices, and a comprehensive set of tools.

#### ⚡️ Lightning-fast performance

Rev up your development workflow with cutting-edge caching and parallel processing, resulting in faster build times and overall enhanced performance.

#### 💪 Effortless monorepo management

Simplify the management of multiple interconnected apps or packages by centralizing them all within a single repository. No more headaches trying to juggle multiple repositories.

### 🔍 Next.js

This website is built on top of Next.js.

I opted for Next.js due to its exceptional developer experience, encompassing all the necessary features I required.
It offers a great blend of hybrid static and server rendering, seamless TypeScript support, intelligent bundling, route pre-fetching, and much more.

### 📦 Prisma

I went with Prisma and PostgreSQL as my database setup.

Prisma is a next-generation ORM that can be used to build GraphQL servers, REST APIs, microservices & more.
I've used Prisma to connect to my PostgreSQL database, facilitated via Supabase.

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
