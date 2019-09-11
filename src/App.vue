<template>
  <div>
		<router-view/>
	</div>
</template>

<script>
import Login from './components/Login';

export default {
	name: 'App',
	components: {
		Login,
	},
	data: () => ({
		//
	}),
};
</script>
