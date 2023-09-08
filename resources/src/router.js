import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import { i18n } from "./plugins/i18n";
import authenticate from "./auth/authenticate";
import IsConnected from "./auth/IsConnected";

import NProgress from "nprogress";

Vue.use(Router);

// create new router

const routes = [
    {
        path: "/",
        component: () => import("./views/app"),
        // beforeEnter: authenticate,
        redirect: "/app/dashboard",

        children: [
            {
                path: "/app/dashboard",
                name: "dashboard",
                component: () => import(/* webpackChunkName: "dashboard" */ "./views/app/dashboard/dashboard")
            },

            //appointments
            {
                path: "/app/appointments",
                component: () => import(/* webpackChunkName: "appointments" */ "./views/app/pages/appointments"),
                redirect: "app/appointments/list",
                children: [
                    {
                        name: "index_appointments",
                        path: "list",
                        component: () =>
                            import(/* webpackChunkName: "index_appointments" */"./views/app/pages/appointments/index_appointments")
                    },
                    {
                        path: "store",
                        name: "store_appointment",
                        component: () =>
                            import(/* webpackChunkName: "store_appointment" */"./views/app/pages/appointments/Add_appointment")
                    },
                    {
                        path: "edit/:id",
                        name: "edit_appointment",
                        component: () =>
                            import(/* webpackChunkName: "edit_appointment" */"./views/app/pages/appointments/Edit_appointment")
                    },
                    {
                        path: "detail/:id",
                        name: "detail_appointment",
                        component: () =>
                            import(/* webpackChunkName: "detail_appointment" */"./views/app/pages/appointments/Detail_Appointment")
                    },
                    {
                        path: "barcode",
                        name: "barcode",
                        component: () =>
                            import(/* webpackChunkName: "barcode" */"./views/app/pages/appointments/barcode")
                    },
                ]
            },
            //dates
            {
                path: "/app/dates",
                component: () => import(/* webpackChunkName: "dates" */ "./views/app/pages/dates"),
                redirect: "app/dates/list",
                children: [
                    {
                        name: "index_dates",
                        path: "list",
                        component: () =>
                            import(/* webpackChunkName: "index_dates" */"./views/app/pages/dates/index_dates")
                    },
                    {
                        path: "store",
                        name: "store_date",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/Add_date")
                    },
                    {
                        path: "date",
                        name: "date_calendar",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/calendar")
                    },
                    {
                        path: "date2/:id",
                        name: "date_calendar2",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/calendar2")
                    },
                    {
                        path: "date/company",
                        name: "date_calendar_company",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/CompanyCalendar")
                    },
                    {
                        path: "date/fisio",
                        name: "date_calendar_fisio",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/FisioCalendar")
                    },
                    {
                        path: "date/vacation",
                        name: "date_vacation",
                        component: () =>
                            import(/* webpackChunkName: "store_date" */"./views/app/pages/dates/vacations")
                    },
                    {
                        path: "edit/:id",
                        name: "edit_date",
                        component: () =>
                            import(/* webpackChunkName: "edit_date" */"./views/app/pages/dates/Edit_date")
                    },
                    {
                        path: "profile/patient/:id",
                        name: "complete_info",
                        component: () =>
                            import(/* webpackChunkName: "edit_date" */"./views/app/pages/people/patientsData.vue")
                    },
                    {
                        path: "detail/:id",
                        name: "detail_date",
                        component: () =>
                            import(/* webpackChunkName: "detail_date" */"./views/app/pages/dates/Detail_Date")
                    },
                ]
            },
            // People
            {
                path: "/app/pages/people",
                component: () => import(/* webpackChunkName: "People" */  "./views/app/pages/people"),
                //redirect: "/app/People/",
                children: [
                    // Companies
                    {
                        name: "Companies",
                        path: "Companies",
                        component: () =>
                            import(/* webpackChunkName: "Companies" */"./views/app/pages/people/companies")
                    },

                    // Suppliers
                    {
                        name: "Suppliers",
                        path: "Suppliers",
                        component: () =>
                            import(/* webpackChunkName: "Suppliers" */"./views/app/pages/people/providers")
                    },

                    // Users
                    {
                        name: "user",
                        path: "Users",
                        component: () =>
                            import(/* webpackChunkName: "Users" */"./views/app/pages/people/users")
                    },
                    {
                        name: "patients",
                        path: "patients",
                        component: () =>
                            import(/* webpackChunkName: "Users" */"./views/app/pages/people/patients")
                    },
                    {
                        name: "doctors",
                        path: "doctors",
                        component: () =>
                            import(/* webpackChunkName: "Users" */"./views/app/pages/people/doctors")
                    }
                ]
            },

            // Settings
            {
                path: "/app/settings",
                component: () => import(/* webpackChunkName: "settings" */  "./views/app/pages/settings"),
                redirect: "/app/settings/System_settings",
                children: [
                    // Permissions
                    {
                        path: "permissions",
                        component: () =>
                            import(/* webpackChunkName: "permissions" */"./views/app/pages/settings/permissions"),
                        redirect: "/app/settings/permissions/list",
                        children: [
                            {
                                name: "groupPermission",
                                path: "list",
                                component: () =>
                                    import(/* webpackChunkName: "groupPermission" */
                                        "./views/app/pages/settings/permissions/Permissions"
                                    )
                            },
                            {
                                name: "store_permission",
                                path: "store",
                                component: () =>
                                    import(/* webpackChunkName: "store_permission" */
                                        "./views/app/pages/settings/permissions/Create_permission"
                                    )
                            },
                            {
                                name: "edit_permission",
                                path: "edit/:id",
                                component: () =>
                                    import(/* webpackChunkName: "edit_permission" */
                                        "./views/app/pages/settings/permissions/Edit_permission"
                                    )
                            }
                        ]
                    },

                     // updates
                    //  {
                    //     name: "updates",
                    //     path: "updates",
                    //     component: () =>
                    //         import(/* webpackChunkName: "updates" */"./views/app/pages/settings/updates")
                    // }
                ]
            },

            // Reports
            {
                path: "/app/reports",
                component: () => import("./views/app/pages/reports"),
                redirect: "/app/reports/profit_and_loss",
                children: [
                    {
                        name: "payments_purchases",
                        path: "payments_purchase",
                        component: () =>
                            import(/* webpackChunkName: "payments_purchases" */
                                "./views/app/pages/reports/payments/payments_purchases"
                            )
                    },
                    {
                        name: "payments_sales",
                        path: "payments_sale",
                        component: () =>
                            import(/* webpackChunkName: "payments_sales" */
                                "./views/app/pages/reports/payments/payments_sales"
                            )
                    },
                    {
                        name: "payments_purchases_returns",
                        path: "payments_purchases_returns",
                        component: () =>
                            import(/* webpackChunkName: "payments_purchases_returns" */
                                "./views/app/pages/reports/payments/payments_purchases_returns"
                            )
                    },
                    {
                        name: "payments_sales_returns",
                        path: "payments_sales_returns",
                        component: () =>
                            import(/* webpackChunkName: "payments_sales_returns" */
                                "./views/app/pages/reports/payments/payments_sales_returns"
                            )
                    },

                    {
                        name: "profit_and_loss",
                        path: "profit_and_loss",
                        component: () =>
                            import(/* webpackChunkName: "profit_and_loss" */
                                "./views/app/pages/reports/profit_and_loss"
                            )
                    },

                    {
                        name: "quantity_alerts",
                        path: "quantity_alerts",
                        component: () =>
                            import(/* webpackChunkName: "quantity_alerts" */
                                "./views/app/pages/reports/quantity_alerts"
                            )
                    },
                    {
                        name: "warehouse_report",
                        path: "warehouse_report",
                        component: () =>
                            import(/* webpackChunkName: "warehouse_report" */
                                "./views/app/pages/reports/warehouse_report"
                            )
                    },

                    {
                        name: "sales_report",
                        path: "sales_report",
                        component: () =>
                            import(/* webpackChunkName: "sales_report" */
                                "./views/app/pages/reports/sales_report"
                            )
                    },
                    {
                        name: "purchase_report",
                        path: "purchase_report",
                        component: () =>
                            import(/* webpackChunkName: "purchase_report" */
                                "./views/app/pages/reports/purchase_report"
                            )
                    },

                    {
                        name: "customers_report",
                        path: "customers_report",
                        component: () =>
                            import(/* webpackChunkName: "customers_report" */
                                "./views/app/pages/reports/customers_report"
                            )
                    },
                    {
                        name: "detail_customer_report",
                        path: "detail_customer/:id",
                        component: () =>
                            import(/* webpackChunkName: "detail_customer_report" */
                                "./views/app/pages/reports/detail_Customer_Report"
                            )
                    },

                    {
                        name: "providers_report",
                        path: "providers_report",
                        component: () =>
                            import(/* webpackChunkName: "providers_report" */
                                "./views/app/pages/reports/providers_report")
                    },
                    {
                        name: "detail_supplier_report",
                        path: "detail_supplier/:id",
                        component: () =>
                            import(/* webpackChunkName: "detail_supplier_report" */
                                "./views/app/pages/reports/detail_Supplier_Report"
                            )
                    }
                ]
            },

            {
                name: "profile",
                path: "/app/profile",
                component: () => import(/* webpackChunkName: "profile" */ "./views/app/pages/profile")
            }
        ]
    },

    {
        path: "*",
        name: "NotFound",
        component: () => import(/* webpackChunkName: "NotFound" */"./views/app/pages/notFound")
    },

    {
        path: "not_authorize",
        name: "not_authorize",
        component: () => import(/* webpackChunkName: "not_authorize" */"./views/app/pages/NotAuthorize")
    }
];

const router = new Router({
    mode: "history",
    linkActiveClass: "open",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {

    // If this isn't an initial page load.
    if (to.path) {

        // Start the route progress bar.
        NProgress.start();
        NProgress.set(0.1);
    }
    next();

    if (
        store.state.language.language &&
        store.state.language.language !== i18n.locale
    ) {
        i18n.locale = store.state.language.language;
        next();
    } else if (!store.state.language.language) {
        store.dispatch("language/setLanguage", navigator.languages).then(() => {
            i18n.locale = store.state.language.language;
            next();
        });
    } else {
        next();
    }

});

router.afterEach(() => {
    // Remove initial loading
    const gullPreLoading = document.getElementById("loading_wrap");
    if (gullPreLoading) {
        gullPreLoading.style.display = "none";
    }
    // Complete the animation of the route progress bar.
    setTimeout(() => NProgress.done(), 500);
    // NProgress.done();

    if (window.innerWidth <= 1200) {
        store.dispatch("changeSidebarProperties");
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }

        if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
            store.dispatch("changeCompactSidebarProperties");
        }
    } else {
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }

    }
});


async function Check_Token(to, from, next) {
    let token = to.params.token;
    const res = await axios.get('password/find/' + token).then(response => response.data);

    if (!res.success) {
        next("/app/sessions/signIn");
    } else {
        return next();
    }
}


export default router;
