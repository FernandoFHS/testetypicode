import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  form: FormGroup;

  themes = [
    { text: 'Padrão', value: 'default-theme' },
    { text: 'Laranja', value: 'orange-theme' },
    { text: 'Azul', value: 'blue-theme' },
    { text: 'Cinza', value: 'grey-theme' },
    { text: 'Dourado', value: 'gold-theme' },
    { text: 'Verde', value: 'green-theme' },
    { text: 'Roxo', value: 'purple-theme' },
    { text: 'Vinho', value: 'wine-theme' },
    { text: 'Rosa', value: 'pink-theme' },
    { text: 'Tema Escuro', value: 'dark-theme' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      selected_theme: ['default-theme', []]
    });
  }

  onChangeTheme(event) {
    console.log(event);

    this._renderer.addClass(document.body, event.value);

    this.resetThemes();
  }

  resetThemes() {
    this.themes.forEach((theme) => {
      if (this.form.get('selected_theme').value != theme.value) {
        this._renderer.removeClass(document.body, theme.value);
      }
    });
  }
}