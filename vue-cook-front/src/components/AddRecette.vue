<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Recette</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="recette.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="recette.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveRecette">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Recette.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newRecette">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";

export default {
  name: "add-recette",
  data() {
    return {
      recette: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveRecette() {
      var data = {
        title: this.recette.title,
        description: this.recette.description,
      };

      RecetteDataService.create(data)
        .then((response) => {
          this.recette.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newRecette() {
      this.submitted = false;
      this.recette = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>


<!--<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="recette.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="recette.description"
          name="description"
        />
      </div>

      <button @click="saveRecette" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newRecette">Add</button>
    </div>
  </div>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";

export default {
  name: "add-recette",
  data() {
    return {
      recette: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveRecette() {
      var data = {
        title: this.recette.title,
        description: this.recette.description
      };

      RecetteDataService.create(data)
        .then(response => {
          this.recette.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newRecette() {
      this.submitted = false;
      this.recette = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
 -->