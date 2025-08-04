import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

/**
 * CarouselComponent displays a horizontal scrollable carousel of images.
 * It allows users to navigate through the images using scroll buttons or mouse wheel.
 * The component is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;

  images = [
    '/assets/img/img0.webp',
    '/assets/img/img1.webp',
    '/assets/img/img2.webp',
    '/assets/img/img3.webp',
    '/assets/img/img4.webp',
    '/assets/img/img5.webp',
    '/assets/img/img6.webp',
    '/assets/img/img7.webp',
    '/assets/img/img8.webp',
    '/assets/img/img9.webp',
    '/assets/img/img10.webp',
    '/assets/img/img11.webp',
    '/assets/img/img12.webp',
    '/assets/img/img13.webp',
    '/assets/img/img14.webp',
    '/assets/img/img15.webp',
    '/assets/img/img16.webp',
    '/assets/img/img17.webp',
    '/assets/img/img18.webp',
  ];

  currentIndex = 0;
  isModalOpen = false;
  selectedImage = '';

  ngAfterViewInit() {
    this.carousel.nativeElement.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (e.deltaY === 0 && e.deltaX === 0) return;
        e.preventDefault();
        this.carousel.nativeElement.scrollLeft +=
          e.deltaX !== 0 ? e.deltaX : e.deltaY;
      },
      { passive: false }
    );
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  openImageModal(imageSrc: string) {
    this.selectedImage = imageSrc;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.isModalOpen = false;
    this.selectedImage = '';
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  onModalBackdropClick(event: Event) {
    // Close modal if clicked outside the image
    if (event.target === event.currentTarget) {
      this.closeImageModal();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeImageModal();
    }
  }
}
