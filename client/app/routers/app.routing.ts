import { Routes, RouterModule } from '@angular/router'
import { IndexContainer, LoginContainer,AccountContainer,RegisterContainer } from '../containers'
import { AuthGuard } from '../guards/auth.guard'

const appRoutes: Routes = [
    { path: '', component: IndexContainer },
    { path: 'login', component: LoginContainer },
    { path: 'login', component: AccountContainer, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterContainer },
    { path: '**', redirectTo: '' }
]

export const routing = RouterModule.forRoot(appRoutes)
