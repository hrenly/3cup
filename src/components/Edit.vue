<template>
	<div>
		<v-form
			ref="formData"
		>
			<v-text-field
				label="Почтовый адрес"
				name="email"
				type="email"
				v-model="user.email"
				:rules="emailRules"
				required
			></v-text-field>
			<v-text-field
				label="Имя"
				name="name"
				type="text"
				v-model="user.name"
				:rules="[() => !!user.name || required]"
				required
			></v-text-field>
			<v-alert
				v-model="alert.show"
				:type="alert.type"
				outlined
				dense
				dismissible
				class="mb-4"
			>{{ alert.text }}</v-alert>
			<v-row
				align="center"
				justify="center"
			>
				<v-btn
					color="primary"
					type="submit"
					@click.prevent="saveData"
				>Сохранить данные</v-btn>
			</v-row>
		</v-form>

		<v-form
			ref="formPass"
		>
			<v-text-field
				label="Пароль"
				name="password"
				type="password"
				v-model="password"
				:rules="[() => !!password || required]"
				required
			></v-text-field>
			<v-text-field
				label="Повторите пароль"
				name="password2"
				type="password"
				v-model="password2"
				:rules="passReplayRules"
				required
			></v-text-field>
			<v-alert
				v-model="alertPass.show"
				:type="alertPass.type"
				outlined
				dense
				dismissible
				class="mb-4"
			>{{ alertPass.text }}</v-alert>
			<v-row
				align="center"
				justify="center"
			>
				<v-btn
					color="primary"
					type="submit"
					@click.prevent="savePass"
				>Сохранить пароль</v-btn>
			</v-row>
		</v-form>

	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			id: this.$route.params.id,
			user: {},
			password: '',
			password2: '',
			alert: {
				text: '',
				show: false,
				type: 'info',
			},
			alertPass: {
				text: '',
				show: false,
				type: 'info',
			},
			required: 'Это обязательное поле',
			emailRules: [
				v => !!v || 'Это обязательное поле',
				(v) => {
					const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return reg.test(String(v).toLowerCase()) || 'Невалидный емейл';
				},
			],
		};
	},
	computed: {
		passReplayRules() {
			return [
				v => !!v || this.required,
				v => v === this.password || 'Пароли должны совпадать',
			];
		},
	},
	methods: {
		getUserData() {
			axios({ url: `http://localhost:3000/userid/${this.id}`, method: 'POST' })
				.then((resp) => {
					this.user = resp.data.user;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		saveData() {
			if (this.$refs.formData.validate()) {
				const data = {
					id: this.id,
					name: this.user.name,
					email: this.user.email,
				};
				console.log(data);
				axios({ url: 'http://localhost:3000/updatedata', data, method: 'POST' })
					.then((resp) => {
						this.alert.text = 'Данные изменены';
						this.alert.show = true;
						this.alert.type = 'info';
					})
					.catch((err) => {
						console.log(err);
						this.alert.show = true;
						this.alert.type = 'error';
						this.alert = 'Такой емейл уже используется';
					});
			}
		},
		savePass() {
			if (this.$refs.formPass.validate()) {
				const data = {
					id: this.id,
					password: this.password,
				};
				axios({ url: 'http://localhost:3000/updatepass', data, method: 'POST' })
					.then((resp) => {
						this.alertPass.text = 'Пароль изменен';
						this.alertPass.show = true;
						this.alertPass.type = 'info';
					})
					.catch((err) => {
						console.log(err);
						this.alertPass.show = true;
						this.alertPass.type = 'error';
						this.alertPass = 'Что-то пошло не так';
					});
			}
		},
	},
	mounted() {
		this.getUserData();
	},
};
</script>

<style>

</style>
