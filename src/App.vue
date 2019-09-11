<template>
  <div>
		<router-view/>
	</div>
</template>

<script>
import Login from './components/Login';
import axios from 'axios';
import store from './store';

export default {
	name: 'App',
	components: {
		Login,
	},
	data: () => ({
		//
	}),
	beforeMount() {
		const headersAuth = !!axios.defaults.headers.common.Authorization;
		const auth = store.getters.isAuthenticated;
		if(!headersAuth && auth) {
			axios.defaults.headers.common.Authorization = store.state.token;
		}
	}
};
</script>
