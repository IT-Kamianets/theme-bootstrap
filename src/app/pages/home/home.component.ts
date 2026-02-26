import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { FinalCtaComponent } from '../../components/final-cta/final-cta.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { ListItemsSectionComponent } from '../../components/list-items-section/list-items-section.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { TrustBarComponent } from '../../components/trust-bar/trust-bar.component';
import { UseCasesComponent } from '../../components/use-cases/use-cases.component';

@Component({
	imports: [
		HeroComponent,
		TrustBarComponent,
		AboutComponent,
		FeaturesComponent,
		HowItWorksComponent,
		ListItemsSectionComponent,
		ShowcaseComponent,
		UseCasesComponent,
		TestimonialsComponent,
		PricingComponent,
		FaqComponent,
		FinalCtaComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
