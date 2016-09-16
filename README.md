# coffeetalk
Matching people up for coffee.

People signup with their name/email and then they get an email, every Monday to opt in/out for the Friday meetup.


People collection:

```json
people: [
  {
    "name": "name",
    "email": "email",
    "availability": "morning" / "afternoon" / "both" / "none",
    "previousMatches": [
        <person>
    ]
  }, ...
]
```
