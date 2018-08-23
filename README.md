# about-service

## Related Projects

  - https://github.com/AirGB/hero-photo-service
  - https://github.com/AirGB/Review-service
  - https://github.com/AirGB/about-service
  - https://github.com/AirGB/reservation_service
  
## API CRUD

### hosts
```sh
curl -X GET http://localhost:3001/api/about/hosts/:id
```

### reviews
```sh
curl -X GET http://localhost:3001/api/about/reviews/:userId
curl -X POST http://localhost:3001/api/about/reviews/new
curl -X DELETE http://localhost:3001/api/about/reviews/:id/delete
curl -X PUT http://localhost:3001/api/about/reviews/:id/update
```

### neighborhood
```sh
curl -X GET http://localhost:3001/api/about/neighborhood/:listingId
```
