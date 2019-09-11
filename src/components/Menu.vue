<template>
    <v-toolbar flat>
        <v-toolbar-items>
            <v-btn
                href="/"
                text
            >Список пользователей</v-btn>
            <v-btn
                href="/add"
                text
            >Добавить пользователя</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
            <v-btn
                @click="logout"
                text
            >Выход</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		logout() {
			this.$store
				.dispatch('logout')
				.then(() => this.$router.push('/login'))
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style>

</style>
