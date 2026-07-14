import { db } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { orders, products } from "@/db/schema";
import type { OrderItem } from "@/db/schema";
import { inArray } from "drizzle-orm";

const DELIVERY_CENTS = 4900;
const FREE_DELIVERY_THRESHOLD = 49900;

export async function POST(req: Request) {
  try {
    await ensureDatabase();
    const data = await req.json();
    const {
      customerName,
      email,
      phone,
      address,
      city,
      postalCode,
      deliveryNotes,
      items,
    } = data ?? {};

    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      typeof address !== "string" ||
      !address.trim() ||
      typeof city !== "string" ||
      !city.trim() ||
      typeof postalCode !== "string" ||
      !postalCode.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    // Validate items against DB prices (never trust client totals)
    const slugs = items.map((i: { slug: string }) => i.slug);
    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.slug, slugs));

    const priceMap = new Map(dbProducts.map((p) => [p.slug, p]));
    const validItems: OrderItem[] = [];
    let subtotalCents = 0;

    for (const item of items) {
      const p = priceMap.get(item.slug);
      const qty = Math.max(1, Math.min(99, Math.round(Number(item.quantity) || 1)));
      if (!p) continue;
      subtotalCents += p.priceCents * qty;
      validItems.push({
        slug: p.slug,
        name: p.name,
        emoji: p.emoji,
        priceCents: p.priceCents,
        quantity: qty,
        unit: p.unit,
      });
    }

    if (validItems.length === 0) {
      return Response.json(
        { error: "No valid items in order." },
        { status: 400 },
      );
    }

    const deliveryCents =
      subtotalCents >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CENTS;
    const totalCents = subtotalCents + deliveryCents;
    const orderNumber = `JP-${Date.now().toString(36).toUpperCase()}${Math.floor(
      Math.random() * 900 + 100,
    )}`;

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: customerName.trim(),
        email: email.trim(),
        phone: (phone ?? "").toString().trim(),
        address: address.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        deliveryNotes: (deliveryNotes ?? "").toString().trim(),
        items: validItems,
        subtotalCents,
        deliveryCents,
        totalCents,
        status: "confirmed",
      })
      .returning();

    return Response.json(
      {
        orderNumber: order.orderNumber,
        totalCents: order.totalCents,
        subtotalCents: order.subtotalCents,
        deliveryCents: order.deliveryCents,
      },
      { status: 201 },
    );
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
