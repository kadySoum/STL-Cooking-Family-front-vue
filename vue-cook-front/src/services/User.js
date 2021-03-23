import http from "../http-common";

class RecetteDataService {
  getAll() {
    return http.get("/signin");
  }

  get(id) {
    return http.get(`/signup`);
  }

  create(data) {
    return http.post("/recettes", data);
  }

  update(id, data) {
    return http.put(`/recettes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/recettes/${id}`);
  }

  deleteAll() {
    return http.delete(`/recettes`);
  }

  findByTitle(title) {
    return http.get(`/recettes?title=${title}`);
  }
}

export default new RecetteDataService();