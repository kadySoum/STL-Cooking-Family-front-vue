<template>
  <div v-if="currentRecette" class="edit-form py-3">
    <p class="headline">Edit Recette</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentRecette.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentRecette.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentRecette.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentRecette.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteRecette">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateRecette">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Recette...</p>
  </div>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";

export default {
  name: "recette",
  data() {
    return {
      currentRecette: null,
      message: "",
    };
  },
  methods: {
    getRecette(id) {
      RecetteDataService.get(id)
        .then((response) => {
          this.currentRecette = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentRecette.id,
        title: this.currentRecette.title,
        description: this.currentRecette.description,
        published: status,
      };

      RecetteDataService.update(this.currentRecette.id, data)
        .then((response) => {
          this.currentRecette.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateRecette() {
      RecetteDataService.update(this.currentRecette.id, this.currentRecette)
        .then((response) => {
          console.log(response.data);
          this.message = "The recette was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteRecette() {
      RecetteDataService.delete(this.currentRecette.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "recettes" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getRecette(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

<!--<template>
  <div v-if="currentRecette" class="edit-form">
    <h4>Recette</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentRecette.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentRecette.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentRecette.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentRecette.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteRecette"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateRecette"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Recette...</p>
  </div>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";

export default {
  name: "recette",
  data() {
    return {
      currentRecette: null,
      message: ''
    };
  },
  methods: {
    getRecette(id) {
      RecetteDataService.get(id)
        .then(response => {
          this.currentRecette = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentRecette.id,
        title: this.currentRecette.title,
        description: this.currentRecette.description,
        published: status
      };

      RecetteDataService.update(this.currentRecette.id, data)
        .then(response => {
          this.currentRecette.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateRecette() {
      RecetteDataService.update(this.currentRecette.id, this.currentRecette)
        .then(response => {
          console.log(response.data);
          this.message = 'The recette was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteRecette() {
      RecetteDataService.delete(this.currentRecette.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "recettes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getRecette(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
-->