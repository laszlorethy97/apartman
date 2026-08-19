import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCheckoutSessionDto } from './dto/payment-checkout-session.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { ReservationService } from 'src/reservation/reservation.service';
import Stripe = require('stripe');

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(
        private configService: ConfigService,
        private readonly reservationService: ReservationService
    ) {
        const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
        if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not defined');
        }
        this.stripe = new Stripe(secretKey, { apiVersion: '2026-07-29.dahlia' });
    }


    async createCheckoutSession(dto: CreateCheckoutSessionDto, userId: number) {
        const unitAmount = this.calculatePrice(dto.startDate, dto.endDate);
        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
            {
                price_data: {
                currency: 'huf',
                product_data: { name: 'Apartman foglalás' },
                unit_amount: unitAmount,
                },
                quantity: 1,
            },
            ],
            metadata: {
            userId: String(userId),
            startDate: dto.startDate,
            endDate: dto.endDate,
            headCount: String(dto.headCount),
            couponCode: dto.couponCode ?? '',
            },
            success_url: `http://localhost:4200/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:4200/something-went-wrong`,
        });

        return { url: session.url };
    }

    private calculatePrice(startDate: string, endDate: string): number {
        const days = Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
        );
        const pricePerNight = 20000; // ezt majd az Apartman entitásból kellene lekérni
        return days * pricePerNight;
    }



    async confirmPayment(sessionId: string) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
        throw new BadRequestException();
        }

        const metadata = session.metadata;
        if (!metadata) {
        throw new BadRequestException();
        }

        const dto: CreateReservationDto = {
        startDate: new Date(metadata.startDate),
        endDate: new Date(metadata.endDate),
        headCount: Number(metadata.headCount),
        couponCode: metadata.couponCode,
        };

        const userId = Number(metadata.userId);

        return this.reservationService.create(userId, dto);
    }

}
