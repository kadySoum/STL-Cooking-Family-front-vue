<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Recettes</v-card-title>

        <v-data-table
          :headers="headers"
          :items="recettes"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRecette(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRecette(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="recettes.length > 0">
          <v-btn small color="error" @click="removeAllRecettes">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";
export default {
  name: "recettes-list",
  data() {
    return {
      recettes: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        //{ text: "Ingredients", value: "ingredients", sortable: false },
      ],
    };
  },
  methods: {
    retrieveRecettes() {
      RecetteDataService.getAll()
        .then((response) => {
          this.recettes = response.data.map(this.getDisplayRecette);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRecettes();
    },

    removeAllRecettes() {
      RecetteDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      RecetteDataService.findByTitle(this.title)
        .then((response) => {
          this.recettes = response.data.map(this.getDisplayRecette);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editRecette(id) {
      this.$router.push({ name: "recette-details", params: { id: id } });
    },

    deleteRecette(id) {
      RecetteDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayRecette(recette) {
      return {
        id: recette.id,
        title: recette.title.length > 30 ? recette.title.substr(0, 30) + "..." : recette.title,
        description: recette.description.length > 30 ? recette.description.substr(0, 30) + "..." : recette.description,
        tatus: recette.published ? "Published" : "Pending",
        //status: recette.ingredients.length > 30 ? recette.ingredients.substr(0, 30) + "..." : recette.ingredients,
       };
    },
  },
  mounted() {
    this.retrieveRecettes();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>


<!--<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Recettes List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(recette, index) in recettes"
          :key="index"
          @click="setActiveRecette(recette, index)"
        >
          {{ recette.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllRecettes">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentRecette">
        <h4>Recette</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentRecette.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentRecette.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentRecette.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/recettes/' + currentRecette.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Recette...</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecetteDataService from "../services/RecetteDataService";

export default {
  name: "recettes-list",
  data() {
    return {
      recettes: [],
      currentRecette: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveRecettes() {
      RecetteDataService.getAll()
        .then(response => {
          this.recettes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRecettes();
      this.currentRecette = null;
      this.currentIndex = -1;
    },

    setActiveRecette(recette, index) {
      this.currentRecette = recette;
      this.currentIndex = index;
    },

    removeAllRecettes() {
      RecetteDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      RecetteDataService.findByTitle(this.title)
        .then(response => {
          this.recettes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveRecettes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
-->