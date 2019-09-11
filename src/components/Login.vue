<template>
	<v-app id="login">
		<v-content>
			<v-container
				class="fill-height"
				fluid
			>
				<v-row
				align="center"
				justify="center"
				>
				<v-col
					cols="12"
					sm="8"
					md="4"
					style="max-width:400px"
				>
					<v-tabs
						background-color="blue darken-2"
						dark
					>
						<v-tabs-slider></v-tabs-slider>
						<v-tab href="#login">
							Авторизация
						</v-tab>
						<v-tab href="#registration">
							Регистрация
						</v-tab>
						<v-tab-item value="login">
							<v-card
								:loading="loading"
							>
								<v-card-text>
									<v-form
										ref="loginForm"
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
											label="Пароль"
											name="password"
											type="password"
											v-model="password"
											:rules="[() => !!password || required]"
											required
										></v-text-field>
										<v-alert
											v-model="showError"
											type="error"
											outlined
											dense
											dismissible
											class="mb-4"
										>{{ error }}</v-alert>
										<v-row
											align="center"
											justify="center"
										>
											<v-btn
												color="primary"
												type="submit"
												@click.prevent="submit"
											>Войти</v-btn>
										</v-row>
									</v-form>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item value="registration">
							<v-card
								:loading="loadingReg"
							>
								<v-card-text>
									<v-form
										ref="registrationForm"
									>
										<v-text-field
											label="Почтовый адрес"
											name="email"
											type="email"
											v-model="emailReg"
											:rules="emailRules"
											required
										></v-text-field>
										<v-text-field
											label="Имя"
											name="name"
											type="text"
											v-model="nameReg"
											:rules="[() => !!nameReg || required]"
											required
										></v-text-field>
										<v-text-field
											label="Пароль"
											name="password"
											type="password"
											v-model="passwordReg"
											:rules="[() => !!passwordReg || required]"
											required
										></v-text-field>
										<v-text-field
											label="Повторите пароль"
											name="password2"
											type="password"
											v-model="passwordReg2"
											:rules="passReplayRules"
											required
										></v-text-field>
										<v-alert
											v-model="showErrorReg"
											type="error"
											outlined
											dense
											dismissible
											class="mb-4"
										>{{ errorReg }}</v-alert>
										<v-row
											align="center"
											justify="center"
										>
											<v-btn
												color="primary"
												type="submit"
												@click.prevent="registration"
											>Зарегистрироваться</v-btn>
										</v-row>
									</v-form>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		email: '',
		password: '',
		emailReg: '',
		nameReg: '',
		passwordReg: '',
		passwordReg2: '',
		required: 'Это обязательное поле',
		emailRules: [
			v => !!v || 'Это обязательное поле',
			(v) => {
				const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return reg.test(String(v).toLowerCase()) || 'Невалидный емейл';
			},
		],
		loading: false,
		loadingReg: false,
		error: '',
		errorReg: '',
		showError: false,
		showErrorReg: false,
	}),
	computed: {
		passReplayRules() {
			return [
				v => !!v || this.required,
				v => v === this.passwordReg || 'Пароли должны совпадать',
			];
		},
	},
	methods: {
		submit() {
			if (this.$refs.loginForm.validate()) {
				const { email, password } = this;
				this.loading = true;
				this.$store
					.dispatch('login', { email, password })
					.then(() => this.$router.push('/'))
					.catch((err) => {
						console.log(err);
						this.loading = false;
						this.showError = true;
						this.error = 'Неверный емейл или пароль';
					});
			}
		},
		registration() {
			if (this.$refs.registrationForm.validate()) {
				const email = this.emailReg;
				const password = this.passwordReg;
				const name = this.nameReg;
				this.loading = true;
				this.$store
					.dispatch('register', { name, email, password })
					.then(() => this.$router.push('/'))
					.catch((err) => {
						this.loading = false;
						if (err.response.status === 500) {
							this.showErrorReg = true;
							this.errorReg = 'Этот емейл уже используется';
						}
					});
			}
		},
	},
};
</script>
