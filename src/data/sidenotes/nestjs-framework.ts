import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "nestjs-framework",
  notes: [
    {
      marker:
        "started building it in late 2016 as a side project he worked on late at night",
      type: "quote",
      content:
        "From a 2019 interview: \"When I started working on Nest in late 2016, I didn't set myself any specific goals. I never even assumed that the project would eventually gain such popularity and turn into a full-fledged framework. You could say that at the beginning, it was just a side-project that I worked on late at night.\" Myśliwiec was a full-stack developer in Poland at the time, frustrated by the lack of structure in Node.js backend development.",
      attribution: "Kamil Myśliwiec, NestJS creator",
      url: "https://angular.love/interview-with-kamil-mysliwiec-part-1/",
    },
    {
      marker:
        "is used in production by Adidas, Autodesk, Roche, BMW, and GitLab",
      type: "source",
      content:
        "NestJS's official companies page lists major adopters including Adidas, Autodesk, Roche, BMW, GitLab, Red Hat, IBM, Decathlon, Société Générale, JetBrains, Capgemini, and Mercedes-Benz. Adidas reportedly uses NestJS microservices for real-time inventory synchronization across 30+ regions. Autodesk refactored backend APIs for 12 products onto NestJS, processing over 1 billion daily requests. As of 2025, approximately 8,000 companies worldwide use NestJS in production.",
      url: "https://docs.nestjs.com/discover/companies",
    },
    {
      marker:
        "The Angular inspiration isn't superficial",
      type: "context",
      content:
        "Myśliwiec was an Angular developer before creating NestJS. Angular's module/DI/decorator architecture solved a real problem on the frontend — it gave large teams shared conventions. NestJS transplants this to the backend. The similarity is intentional: Angular developers can switch to NestJS backend work with minimal conceptual overhead. The framework even uses the same `reflect-metadata` library that Angular relies on for its DI system.",
      url: "https://dev.to/shahjalalbu/understanding-dependency-injection-with-typescript-nestjs-and-angular-53n6",
    },
    {
      marker:
        "Without `emitDecoratorMetadata`, the DI container can't inspect constructor parameters at runtime",
      type: "note",
      content:
        "NestJS relies on TypeScript's experimental `emitDecoratorMetadata` compiler option, which uses the `reflect-metadata` library to store type information at runtime. Every time a class is decorated and this flag is enabled, the TypeScript compiler adds `design:paramtypes` metadata to the class. The NestJS DI container reads this metadata to automatically resolve the dependency tree — it literally inspects what types your constructor expects and provides them. This is why NestJS requires TypeScript: the entire DI system is built on a TypeScript-specific compiler feature.",
      url: "https://github.com/nestjs/nest/blob/master/packages/common/decorators/core/injectable.decorator.ts",
    },
    {
      marker:
        "middleware, then guards, then interceptors (pre), then pipes, then your handler",
      type: "source",
      content:
        "The full lifecycle from the official docs: globally-bound middleware → module-bound middleware → global guards → controller guards → route guards → global interceptors (pre) → controller interceptors (pre) → route interceptors (pre) → global pipes → controller pipes → route pipes → route parameter pipes → handler → route interceptors (post) → controller interceptors (post) → global interceptors (post) → exception filters (route → controller → global). Interceptors uniquely resolve in first-in-last-out order due to their RxJS Observable wrapping.",
      url: "https://docs.nestjs.com/faq/request-lifecycle",
    },
    {
      marker:
        "NestJS is the heavy option",
      type: "counter",
      content:
        "Performance benchmarks from early 2026 show Express handling 15,000–20,000 requests per second for simple JSON responses, while Fastify achieves 30,000–76,000 RPS. NestJS with the Express adapter sits close to raw Express numbers; with the Fastify adapter, it gets roughly 2x the throughput of NestJS+Express while keeping the architecture layer. For typical CRUD applications the overhead is negligible, but for hot paths processing thousands of requests per second, the abstraction cost is measurable.",
      url: "https://blog.scalablebackend.com/performance-testing-express-fastify-and-nestjs-with-expressfastify",
    },
    {
      marker:
        "NestJS is the architecture layer on top",
      type: "quote",
      content:
        "Full quote from Myśliwiec: \"The goal was to create a tool that makes working with it as efficient as humanly possible, increases productivity, imposes some structure, while not limiting the developer.\" In a 2025 statement he expanded on this: \"NestJS's greatest strength lies in its ability to enforce architectural patterns that scale with your team. The framework's opinionated structure reduces decision fatigue and ensures consistency across large codebases, making onboarding and maintenance significantly easier.\"",
      attribution: "Kamil Myśliwiec, NestJS creator",
      url: "https://angular.love/interview-with-kamil-mysliwiec-part-1/",
    },
    {
      marker:
        "NestJS provides transport-layer abstractions over TCP, Redis, NATS, RabbitMQ, Kafka, gRPC, and MQTT",
      type: "context",
      content:
        "NestJS's microservices package abstracts the transport layer so that switching from, say, TCP to Kafka requires changing one configuration object — not rewriting message handlers. Each transporter implements the same `ClientProxy` interface. This is particularly useful for teams that prototype with simple TCP locally but deploy with managed message brokers in production. The gRPC transporter also integrates with Protocol Buffers for strongly-typed service definitions across languages.",
      url: "https://docs.nestjs.com/microservices/basics",
    },
  ],
};
