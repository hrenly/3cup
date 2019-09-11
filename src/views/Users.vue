<template>
	<v-app id="users">
		<v-content>
	  		<Menu />
			<v-col
				cols="12"
				sm="8"
				md="6"
			>
				<Users />
			</v-col>
		</v-content>
  </v-app>
</template>

<script>
import Menu from '../components/Menu';
import Users from '../components/Users';

export default {
	components: {
		Menu,
		Users,
	},
};
</script>
