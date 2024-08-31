import { Component } from '@angular/core';
import { UrlshortenService } from '../../services/urlshorten/urlshorten.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  url?: string;
  showShortenUrl: string = "";
  isShortened: boolean = false;
  isError: boolean = false;
  errorMessage: string = "";
  urlLink: string = "";
  triedToShorten: boolean = false; 
  constructor(private readonly urlShort: UrlshortenService) {}

  onShort(): void {
    this.triedToShorten = true; // Set this flag when the user attempts to shorten a URL

    if (this.url) {
      const duration = 3000;

      confetti({
        particleCount: 500,
        spread: 369,
        origin: { y: 0.4 },
      });
    
      setTimeout(() => confetti.reset(), duration);

      this.urlShort.shortTheUrl(this.url).subscribe({
        next: (shortUrl) => {
          this.showShortenUrl = shortUrl;
          this.isShortened = true;
          this.isError = false;
          this.getOriginalUrl(this.showShortenUrl);
          // this.showTheLink();
        },
        error: (err) => {
          console.error('Error shortening URL:', err);
          this.isShortened = false;
          this.isError = true;
          this.errorMessage = 'Error shortening URL. Please try again.';
        }
      });
    } else {
      this.isError = true;
      this.errorMessage = 'Please enter a valid URL to shorten.';
    }
  }

  getOriginalUrl(pathShortUrl: string): void {
    this.urlShort.getOriginalUrl(pathShortUrl).subscribe({
      next: (originalUrl: string) => { 
        this.urlLink = originalUrl;   // this because we dont have an object like ex: originalUrl.SomeThing
        console.log('Original URL:', this.urlLink);
      },
      error: (err) => {
        console.error('Error retrieving original URL:', err);
        this.isError = true;
        this.errorMessage = 'Error retrieving original URL. Please try again.';
      }
    });
  }

  copyToClipboard(): void {
    if (this.urlLink) {
      navigator.clipboard.writeText(this.urlLink).then(() => {
        console.log('URL copied to clipboard');
      }).catch(err => {
        console.error('Error copying URL:', err);
      });
    } else {
      console.error('No URL to copy');
    }
  }
}
