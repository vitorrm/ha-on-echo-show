# Open Recipes Intent Design

**Date:** 2026-11-20
**Size:** Small change

## Intent & Why

Allow saying *"Alexa, abrir receitas no meu assistente"* on an Amazon Echo Show to open the Home Assistant `/lovelace/receitas` view in the built-in Silk browser. The `/lovelace/receitas` page itself will be dynamic on the Home Assistant side, so the Alexa skill only needs a static route for `"receitas"`.

## Goals, Non-Goals & Anti-Goals

- **Goal:** Saying *"abrir receitas no meu assistente"* (and close `pt-BR` phrasings) opens `${process.env.HA_ENDPOINT}/lovelace/receitas` on the Echo Show and responds with `'Ok'`.
- **Non-goal:** Generic multi-page voice routing or dynamic slot parsing for arbitrary dashboard names.
- **Anti-goal:** Breaking or altering existing `LaunchRequest` (`default_view`) or `OpenPageIntent` (`CAMERA_ENDPOINT`) behavior, or hardcoding the Home Assistant domain in code or config.

## Constraints

- Build the URL from `process.env.HA_ENDPOINT` (injected via AWS SSM in `serverless.yml`); never hardcode the domain.
- Keep user-facing speech and interaction model utterances in Brazilian Portuguese (`pt-BR`).
- Follow repo conventions: ESM with explicit `.js` imports, tabs/single quotes/no semicolons (`npm run lint`), and register the new handler in `index.js` before `FallbackIntentHandler`.
- Deploy both Lambda code and the updated Alexa interaction model (`npm run deploy` or `deploy:lambda` + `deploy:model`).

## Approaches Considered

1. **Dedicated `OpenRecipesIntent` (Selected):** Add a dedicated intent in `skill-package/interactionModels/custom/pt-BR.json` and a matching handler in `src/intents/openRecipesIntentHandler.js`. Chosen for highest Alexa speech-recognition accuracy (no slot ambiguity), zero risk to `OpenPageIntent`, and minimal code.
2. **Extend `OpenPageIntent` with a custom `PAGE_NAME` slot:** Replace/extend the `AMAZON.NUMBER` slot with a custom slot type and route via a lookup map in `openPageIntentHandler.js`. Rejected as unnecessary complexity and regression risk for a single static route.

## Decisions Made

- **Approach:** Dedicated `OpenRecipesIntent`.
- **Target URL:** `${process.env.HA_ENDPOINT}/lovelace/receitas`.
- **Alexa speech response:** `'Ok'` (consistent with `LaunchRequestHandler`).

## Left to the Builder

- Exact sample utterances in `pt-BR.json` (e.g., `"abrir receitas"`, `"abrir receita"`, `"receitas"`, `"mostrar receitas"`).
- Updating `README.md` (and `AGENTS.md` if appropriate) to document the new voice command.
- Running `npm run lint` to verify formatting and linting.
