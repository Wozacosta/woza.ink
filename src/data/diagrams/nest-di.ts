import type { InteractiveDiagramConfig } from "./types";

export const nestDi: InteractiveDiagramConfig = {
  tourLabel: "Resolve one dependency",
  intro: "Tap a box to see what it does, or follow one dependency from the constructor to a ready controller.",
  nodes: [
    {
      id: "controller",
      title: "UsersController",
      description: "You declare what it needs in the constructor. You don't new anything up, and there's no manual wiring.",
      links: ["compiler"],
    },
    {
      id: "compiler",
      title: "TypeScript compiler",
      description: "Types vanish at compile time, unless emitDecoratorMetadata is on. Then the compiler keeps the constructor's types as design:paramtypes metadata.",
      links: ["controller", "container"],
    },
    {
      id: "container",
      title: "DI container",
      description: "At startup it reads that metadata, sees that the controller needs a UsersService, and looks for a provider that supplies one.",
      links: ["compiler", "module", "instance"],
    },
    {
      id: "module",
      title: "UsersModule",
      description: "Lists UsersService in its providers. If the service lived in another module, that module would have to export it.",
      links: ["container"],
    },
    {
      id: "instance",
      title: "A ready controller",
      description: "The framework builds the controller with its dependency in place. In a test, swap the provider for a mock and the consuming code doesn't change.",
      links: ["container"],
    },
  ],
  steps: [
    {
      text: "You write a constructor that asks for a UsersService.",
      nodes: ["controller"],
      edges: [],
    },
    {
      text: "The compiler keeps that type as metadata, so it survives into runtime.",
      nodes: ["controller", "compiler"],
      edges: ["controller-compiler"],
    },
    {
      text: "The DI container reads the metadata to learn what the constructor expects.",
      nodes: ["compiler", "container"],
      edges: ["compiler-container"],
    },
    {
      text: "It finds UsersService in the module's providers.",
      nodes: ["module", "container"],
      edges: ["module-container"],
    },
    {
      text: "It builds the controller with the service injected. Your handler can use it straight away.",
      nodes: ["container", "instance"],
      edges: ["container-instance"],
    },
  ],
};
