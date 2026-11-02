import type { InteractiveDiagramConfig } from "./types";

export const nestLifecycle: InteractiveDiagramConfig = {
  tourLabel: "Follow a request",
  intro: "Tap a layer to see its job, or follow one request down to your handler and back out.",
  nodes: [
    {
      id: "middleware",
      title: "Middleware",
      description: "Runs first, and it's the same concept as Express middleware: logging, CORS, body parsing. It has access to req, res and next.",
      links: ["guards"],
    },
    {
      id: "guards",
      title: "Guards",
      description: "Authorization. They return true or false, and if it's false the request stops here. Auth logic stays out of business logic.",
      links: ["middleware", "before"],
    },
    {
      id: "before",
      title: "Interceptors, on the way in",
      description: "They wrap the handler's execution, running before and after it through RxJS observables. This half can add caching or start a timer.",
      links: ["guards", "pipes"],
    },
    {
      id: "pipes",
      title: "Pipes",
      description: "Validation and transformation. Parse a string ID into a number, or validate a DTO against a schema. Bad input is rejected before it reaches your handler.",
      links: ["before", "handler"],
    },
    {
      id: "handler",
      title: "Your handler",
      description: "Auth is a guard, validation is a pipe and logging is an interceptor, so the handler just handles.",
      links: ["pipes", "after", "filters"],
    },
    {
      id: "after",
      title: "Interceptors, on the way out",
      description: "The other half of the same interceptors. They can transform the response, log timing or handle errors.",
      links: ["handler", "response"],
    },
    {
      id: "response",
      title: "Response",
      description: "What the client gets: the handler's result after the interceptors, or whatever an exception filter wrote.",
      links: ["after", "filters"],
    },
    {
      id: "filters",
      title: "Exception filters",
      description: "They catch errors and format the response. An uncaught exception skips the rest of the lifecycle and lands here. They can be global or scoped to specific controllers.",
      links: ["handler", "response"],
    },
  ],
  steps: [
    {
      text: "A request arrives and middleware runs first: logging, CORS, body parsing.",
      nodes: ["middleware"],
      edges: [],
    },
    {
      text: "Guards decide whether it's authorized. If they return false, the request stops here.",
      nodes: ["middleware", "guards"],
      edges: ["middleware-guards"],
    },
    {
      text: "Interceptors run their first half. They wrap everything from here to the handler.",
      nodes: ["guards", "before"],
      edges: ["guards-before"],
    },
    {
      text: "Pipes parse and validate the input, and reject it if it's bad.",
      nodes: ["before", "pipes"],
      edges: ["before-pipes"],
    },
    {
      text: "Your handler runs. By now the request is authorized and the input is valid.",
      nodes: ["pipes", "handler"],
      edges: ["pipes-handler"],
    },
    {
      text: "On the way out the interceptors run again, and can transform the response.",
      nodes: ["handler", "after"],
      edges: ["handler-after"],
    },
    {
      text: "The response goes back to the client.",
      nodes: ["after", "response"],
      edges: ["after-response"],
    },
    {
      text: "If something threw, an exception filter catches it and formats the response instead.",
      nodes: ["handler", "filters", "response"],
      edges: ["handler-filters", "filters-response"],
    },
  ],
};
