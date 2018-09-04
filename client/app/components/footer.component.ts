import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `
    <footer class="container mt-5">
        <p class="float-right"><a href="#">Back to top</a></p>
        <p>© 2018 -2019 Green Pioneer Solutions</p>
        <a href="https://github.com/GreenPioneer/meanstackjs">
            <span class="fa fa-github-alt"></span> Github
        </a>
        <br>
        <a href="https://twitter.com/meanstackjs">
            <span class="fa fa-twitter"></span> @meanstackjs
        </a>
    </footer>
  `
})
export class FooterComponent { }
