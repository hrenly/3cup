<template>
	<v-app id="add">
		<v-content>
	  		<Menu />
			<v-col
				cols="12"
				sm="8"
				md="6"
			>
				<Add />
			</v-col>
		</v-content>
  </v-app>
</template>

<script>
import Menu from '../components/Menu';
import Add from '../components/Add';

export default {
	components: {
		Menu,
		Add,
	},
};
</script>
