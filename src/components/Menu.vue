<template>
    <v-toolbar flat>
        <v-toolbar-items  v-if="!$vuetify.breakpoint.smAndUp">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        v-on="on"
                        text
                    >Меню</v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-btn
                            to="/"
                            text
                        >Список пользователей</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <!-- <router-link to="/add">
                        Добавить пользователя
                        </router-link> -->
                        <v-btn
                            to="/add"
                            text
                        >Добавить пользователя</v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn
                            @click="logout"
                            text
                        >Выход</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar-items>
        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
            <v-btn
                to="/"
                text
            >Список пользователей</v-btn>
            <v-btn
                to="/add"
                text
            >Добавить пользователя</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1" v-if="$vuetify.breakpoint.smAndUp"></div>
        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
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
