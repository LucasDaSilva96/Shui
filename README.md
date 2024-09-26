# Individuell examination - Shui av Lucas Da Silva

[preview image](/Shui.png)

**Front-End documentation**
[client](https://github.com/LucasDaSilva96/Shui/tree/main/client)

**Back-End documentation**
[server](https://github.com/LucasDaSilva96/Shui/tree/main/server/shui-server)

## Instruktioner

Du ska bygga en enkel anslagstavla där det går att posta meddelanden. Det ska gå och se alla meddelanden samt posta ett nytt meddelande där man anger ett användarnamn. Se längre ner vad ett meddelande ska innehålla. Du ska bygga både en frontend i React (annat ramverk är godkänt med) och ett serverless API i AWS. Din frontend ska vara "hostad" i en S3 - bucket på AWS och du ska använda dig av ditt API i dina API-anrop.

### Funktionella krav

- Det går att posta ett nytt meddelande.

- Det går att ändra ett valfritt postat meddelande och det ska inte gå att kunna ändra ett meddelande som inte finns.

- Det går att se alla meddelanden.

### Tekniska krav

**Frontend**

- Byggt med ett ramverk (förslagvis React)

- Deployad på AWS i en S3 bucket och nåbar via URL.

**Backend**

- Serverless framework

- API Gateway

- Lambda

- DynamoDB

**Meddelande**

Ett meddelande har följande egenskaper:

- id

- username

- text

- createdAt

### Betygskriterier

**För Godkänt:**

- Uppfyller alla funktionella och tekniska krav

**För Väl Godkänt:**

- Det går att sortera alla meddelanden på datum

- Det går att hämta alla meddelanden från alla användare men också från en specifik användare (detta ska vara gjort i backend d.v.s. att man via sin endpoint skickar ett användarnamn och får tillbaka alla meddelanden kopplat till den användaren). Det ska dock finnas ett sökfält i frontend där jag som användare skriver in det användarnamn jag vill visa meddelanden för.
