import VuetifyComponent from '@/components/practice/VuetifyComponent'
import ModelingComponent from '@/components/practice/ModelingComponent'
import ConditionalComponent from '@/components/practice/ConditionalComponent'
import HookComponent from '@/components/practice/HookComponent'
import WatchUpdateComponent from '@/components/practice/WatchUpdateComponent'
import AxiosTestComponent from '@/components/practice/AxiosTestComponent'
import RouterTestComponent from '@/components/practice/RouterTestComponent'
import StoreTestComponent from '@/components/practice/StoreTestComponent'

export const practiceRouter = [
    {
        path: '/practice/vuetify',
        name: 'VuetifyComponent',
        component: VuetifyComponent
    },
    {
        path: '/practice/modeling',
        name: 'ModelingComponent',
        component: ModelingComponent
    },
    {
        path: '/practice/conditional',
        name: 'ConditionalComponent',
        component: ConditionalComponent
    },
    {
        path: '/practice/hooks',
        name: 'HookComponent',
        component: HookComponent
    },
    {
        path: '/practice/hooks-watch-update',
        name: 'WatchUpdateComponent',
        component: WatchUpdateComponent
    },
    {
        path: '/practice/axiostest',
        name: 'AxiosTestComponent',
        component: AxiosTestComponent
    },
    {
        path: '/practice/routertest',
        name: 'RouterTestComponent',
        component: RouterTestComponent
    },
    {
        path: '/practice/storetest',
        name: 'StoreTestComponent',
        component: StoreTestComponent
    }
]
