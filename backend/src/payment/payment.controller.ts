import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutSessionDto } from './dto/payment-checkout-session.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

    @Post('checkout-session')
    async createCheckoutSession(@Body() dto: CreateCheckoutSessionDto) {
        const userId = 1;
        return this.paymentService.createCheckoutSession(dto, userId);
    }

    @Get('confirm')
    async confirmPayment(@Query('session_id') sessionId: string) {
        return this.paymentService.confirmPayment(sessionId);
    }
}