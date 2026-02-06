import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from '../../components/about/about';
import { Faq } from '../../components/faq/faq';
import { Features } from '../../components/features/features';
import { FinalCta } from '../../components/final-cta/final-cta';
import { Hero } from '../../components/hero/hero';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Pricing } from '../../components/pricing/pricing';
import { Showcase } from '../../components/showcase/showcase';
import { Testimonials } from '../../components/testimonials/testimonials';
import { TrustBar } from '../../components/trust-bar/trust-bar';
import { UseCases } from '../../components/use-cases/use-cases';

@Component({
	imports: [
		Hero,
		TrustBar,
		About,
		Features,
		HowItWorks,
		Showcase,
		UseCases,
		Testimonials,
		Pricing,
		Faq,
		FinalCta,
	],
	templateUrl: './home.html',
	styleUrl: './home.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
