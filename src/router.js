import Vue from 'vue';
import Router from 'vue-router';
import Users from './views/Users.vue';
import Login from './views/Login.vue';
import Edit from './views/Edit.vue';
import Add from './views/Add.vue';
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/');
};

const ifAuthenticated = (to, from, next) => {
	if (store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/login');
};

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Users',
			component: Users,
			beforeEnter: ifAuthenticated,
		},
		// {
		//   path: '/account',
		//   name: 'Account',
		//   component: Account,
		//   beforeEnter: ifAuthenticated,
		// },
		{
			path: '/login',
			name: 'Login',
			component: Login,
			beforeEnter: ifNotAuthenticated,
		},
		{
			path: '/edit/:id',
			name: 'Edit',
			component: Edit,
			props: true,
			beforeEnter: ifAuthenticated,
		}, {
			path: '/add',
			name: 'Add',
			component: Add,
			beforeEnter: ifAuthenticated,
		},
	],
});
