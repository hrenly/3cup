<template>
	<div>
		<v-alert
			v-model="showError"
			:type="type"
			outlined
			dense
			dismissible
			class="mb-4"
		>{{ error }}</v-alert>

		<v-data-table
			:headers="headers"
			:items="users"
			:items-per-page="10"
		>
			<template v-slot:item.name="{ item }">
				<a :href="editLink(item.id)">{{ item.name }}</a>
			</template>
			<template v-slot:item.delete="{ item }">
				<a
					href="#"
					@click.prevent="deleteUser(item.id)"
				>Удалить</a>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			headers: [
				{
					text: 'Имя',
					value: 'name',
				},
				{
					text: 'Почтовый адрес',
					value: 'email',
				},
				{
					text: 'Удалить',
					value: 'delete',
				},
			],
			users: [],
			error: '',
			showError: false,
			type: 'info',
		};
	},
	computed: {

	},
	methods: {
		editLink(id) {
			return `/edit/${id}`;
		},
		getUsers() {
			axios({ url: 'http://localhost:3000/users', method: 'POST' })
				.then((resp) => {
					this.users = resp.data.users;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		deleteUser(id) {
			axios({ url: 'http://localhost:3000/removeuser', data: { id }, method: 'POST' })
				.then((resp) => {
					const startId = this.users.findIndex(el => el.id === id);
					this.users.splice(startId, 1);
					this.showError = true;
					this.error = 'Пользователь удален';
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	mounted() {
		this.getUsers();
	},
};
</script>

<style>

</style>
