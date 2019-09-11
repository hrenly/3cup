<template>
  <v-app id="home">
    <v-content>
      <Menu />
      <v-container
				class="fill-height"
				fluid
			>
				<v-row
          align="center"
          justify="center"
				>
          <div align="center">
            <h1>404</h1>
            <p>Page is not found</p>
          </div>
				</v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Menu from '../components/Menu';

export default {
	components: {
		Menu,
	},
};
</script>
