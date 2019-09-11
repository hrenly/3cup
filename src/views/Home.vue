<template>
  <v-app id="home">
    <v-content>
      <Menu />
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
