import { Component } from '@angular/core';

@Component({
  selector: 'app-test-css',
  standalone: true,
  imports: [],
  templateUrl: './test-css.component.html',
  styleUrl: './test-css.component.css'
})
export class TestCSSComponent {
  items = Array.from(Array(52).keys());
  revealCard(index: number) {
    console.log(`OPEN ${index}`)
    // this.items = this.items.filter(x => x !== this.items[index])
    delete this.items[index]
    console.log(this.items)

  }
}
