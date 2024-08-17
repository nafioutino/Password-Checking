import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulaire', // Définit le sélecteur pour ce composant
  templateUrl: './formulaire.component.html', // Lien vers le fichier HTML du template
  styleUrls: ['./formulaire.component.css'], // Lien vers le fichier CSS associé
})
export class FormulaireComponent {
  loginForm: FormGroup; // Définit le groupe de formulaires pour le login
  isUpperCaseValid = false; // Indique si le mot de passe contient une lettre majuscule
  isLowerCaseValid = false; // Indique si le mot de passe contient une lettre minuscule
  isNumericValid = false; // Indique si le mot de passe contient un chiffre
  isSpecialCharValid = false; // Indique si le mot de passe contient un caractère spécial
  isMinLengthValid = false; // Indique si le mot de passe a la longueur minimale requise
  showAnimation = false; // Variable pour contrôler l'animation

  constructor(private fb: FormBuilder) {
    // Utilisation du FormBuilder pour initialiser le formulaire avec les champs `username` et `password`
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Le champ `username` est requis
      password: [
        '',
        [
          Validators.required, // Le champ `password` est requis
          Validators.minLength(8), // Le mot de passe doit avoir au moins 8 caractères
          this.passwordValidator.bind(this), // Valide le mot de passe selon les règles personnalisées
        ],
      ],
    });

    // Écoute les changements de valeur du champ `password` et vérifie les règles
    this.loginForm.get('password')?.valueChanges.subscribe((value) => {
      this.checkPasswordRules(value);
    });
  }

  // Validateur personnalisé pour vérifier les règles du mot de passe
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    // Effectue la vérification des règles de manière détaillée
    this.checkPasswordRules(value);

    // Vérifie si toutes les règles sont respectées pour valider ou invalider le mot de passe
    const passwordValid =
      this.isUpperCaseValid &&
      this.isLowerCaseValid &&
      this.isNumericValid &&
      this.isSpecialCharValid &&
      this.isMinLengthValid;

    // Retourne une erreur si le mot de passe est invalide
    return !passwordValid ? { passwordInvalid: true } : null;
  }

  // Vérifie les règles de complexité du mot de passe
  checkPasswordRules(value: string): void {
    this.isUpperCaseValid = /[A-Z]/.test(value); // Vérifie la présence d'une majuscule
    this.isLowerCaseValid = /[a-z]/.test(value); // Vérifie la présence d'une minuscule
    this.isNumericValid = /[0-9]/.test(value); // Vérifie la présence d'un chiffre
    this.isSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(value); // Vérifie la présence d'un caractère spécial
    this.isMinLengthValid = value.length >= 8; // Vérifie la longueur minimale du mot de passe
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      // Logique pour soumettre les données du formulaire
      console.log(this.loginForm.value);
      // Récupère la valeur du mot de passe à partir du formulaire
      const password = this.loginForm.get('password')?.value;

      // Enregistre le mot de passe dans le localStorage
      localStorage.setItem('userPassword', password);

      console.log('Mot de passe enregistré dans le localStorage:', password);
      // Déclenche l'animation
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    this.showAnimation = true;
    setTimeout(() => {
      this.showAnimation = false;
    }, 3000); // Durée de l'animation en millisecondes
  }
}
