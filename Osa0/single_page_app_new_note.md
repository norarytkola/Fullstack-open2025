```mermaid

sequenceDiagram
    participant browser
    participant server

    %% Palvelin ei suorita uudelleenohjausta, koska käyttäjä on single-page-appissa ja sivusto on jo ladattu.
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

```