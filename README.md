# coffeetalk
Matching people up for coffee


People collection:

```json
people: [
  { 
    "name": "name",
    "email": "email",
    <hashed_authentication_stuff?>,
    "availability": "morning" / "afternoon" / "both" / null,
    "previousMatches": [
        <people> 
    ]
  }, ...
]
```
