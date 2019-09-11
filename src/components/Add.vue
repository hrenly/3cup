<template>
	<div>
		<v-form
			ref="form"
		>
			<v-text-field
				label="Почтовый адрес"
				name="email"
				type="email"
				v-model="email"
				:rules="emailRules"
				required
			></v-text-field>
			<v-text-field
				label="Имя"
				name="name"
				type="text"
				v-model="name"
				:rules="[() => !!name || required]"
				required
			></v-text-field>
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
			<v-text-field
				label="Фамилия"
				name="surname"
				type="text"
				v-model="surname"
			></v-text-field>
			<v-text-field
				label="Отчество"
				name="patronymic"
				type="text"
				v-model="patronymic"
			></v-text-field>
			<v-text-field
				label="Год рождения"
				name="birthyear"
				type="number"
				v-model="birthyear"
				:rules="yearRules"
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
				>Создать пользователя</v-btn>
			</v-row>
		</v-form>

	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			name: '',
			email: '',
			surname: '',
			patronymic: '',
			birthyear: '',
			password: '',
			password2: '',
			alert: {
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
			yearRules: [
				(v) => {
					const reg = /^\d{4,4}$/;
					return reg.test(String(v).toLowerCase()) || 'Неверный формат года';
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
		saveData() {
			if (this.$refs.form.validate()) {
				const {
					name,
					email,
					password,
					surname,
					patronymic,
					birthyear,
				} = this;
				const data = {
					name,
					email,
					password,
					surname,
					patronymic,
					birthyear,
				};
				axios({ url: 'http://localhost:3000/register', data, method: 'POST' })
					.then((resp) => {
						this.alert.text = 'Пользователь создан';
						this.alert.show = true;
						this.alert.type = 'success';
						this.$refs.form.reset();
					})
					.catch((err) => {
						console.log(err);
						this.alert.show = true;
						this.alert.type = 'error';
						this.alert.text = 'Такой емейл уже используется';
					});
			}
		},
	},
};
</script>

<style>

</style>
