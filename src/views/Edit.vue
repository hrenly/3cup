<template>
	<v-app id="edit">
		<v-content>
	  		<Menu />
			<v-col
				cols="12"
				sm="8"
				md="6"
			>
				<Edit />
			</v-col>
		</v-content>
  </v-app>
</template>

<script>
import Menu from '../components/Menu';
import Edit from '../components/Edit';

export default {
	components: {
		Menu,
		Edit,
	},
};
</script>
