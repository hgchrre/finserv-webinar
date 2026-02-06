#!/bin/bash
# Convex setup script
# Run this script to initialize Convex and seed the database
# Or use: pnpm setup

set -e

echo "🚀 Setting up Convex for finserv-webinar..."
echo ""

# Step 1: Initialize Convex (requires interactive authentication)
echo "Step 1: Initializing Convex project..."
echo "This will prompt you to log in with GitHub if not already authenticated."
pnpm convex:init

# Step 2: Seed the database
echo ""
echo "Step 2: Seeding database with initial data..."
pnpm convex:seed

echo ""
echo "✅ Convex setup complete!"
echo ""
echo "Next steps:"
echo "Start both servers: pnpm dev"
echo "Then open http://localhost:3000 to see your dashboard"
