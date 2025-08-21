# OctoCAT Supply Chain Management Application

**Always follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

## Repository Information

- Owner: erikrs92  
- Repository: github-scaled-agent-mode-webinar
- Node.js: v22.18.0 (required: >=18)
- npm: 10.9.3

## Architecture Overview

This is a TypeScript monorepo with two main workspaces:
- **API**: Express.js REST API with Swagger/OpenAPI documentation (port 3000)
- **Frontend**: React + Vite application with Tailwind CSS (port 5137)

Complete architecture details: [docs/architecture.md](../docs/architecture.md)

## Working Effectively

### Bootstrap and Dependencies
```bash
# Install all dependencies for both workspaces
npm install  # Takes ~2 seconds
```

### Build Process
```bash
# Build both API and Frontend
npm run build  # Takes ~7 seconds - NEVER CANCEL, set timeout to 30+ seconds

# Build individual workspaces
npm run build --workspace=api      # Build API only (~3 seconds)
npm run build --workspace=frontend # Build Frontend only (~5 seconds)
```

### Development Servers
```bash
# Start both API and Frontend in development mode with hot reloading
npm run dev  # Starts both servers concurrently

# Start individual servers
npm run dev:api      # API only on port 3000 (starts in ~2 seconds)
npm run dev:frontend # Frontend only on port 5137 (starts in ~3 seconds)
```

**API Development Server Details:**
- Runs on http://localhost:3000
- Swagger documentation: http://localhost:3000/api-docs
- Health check: http://localhost:3000/ (returns "Hello, world!")
- Sample API endpoints: http://localhost:3000/api/branches
- CORS configured for Codespaces and local development

**Frontend Development Server Details:**
- Runs on http://localhost:5137
- Hot module replacement enabled
- Connects to API at localhost:3000

### Testing
```bash
# Run API tests (Frontend has no tests configured)
npm run test:api  # Takes <1 second using Vitest

# The following command FAILS because frontend has no test script:
npm run test  # DO NOT USE - will fail with error:
              # "npm error Missing script: "test""
```

### Code Quality
```bash
# Run ESLint on frontend code
npm run lint  # Takes ~2 seconds
```

## Validation Scenarios

**Always perform these validation steps after making changes:**

1. **Build Validation**: Run `npm run build` and ensure both workspaces compile successfully
2. **API Testing**: Start API with `npm run dev:api`, then test endpoints:
   - Visit http://localhost:3000/ (should return "Hello, world!")
   - Visit http://localhost:3000/api-docs for Swagger UI
   - Test API endpoint: `curl http://localhost:3000/api/branches`
3. **Frontend Testing**: Start frontend with `npm run dev:frontend`, visit http://localhost:5137/
4. **Full Application**: Run `npm run dev` and verify both servers start and frontend can communicate with API
5. **Linting**: Always run `npm run lint` before committing changes

## Important Timing and Warnings

- **Build**: ~7 seconds - Set timeout to 30+ seconds minimum
- **Tests**: <1 second for API tests
- **Development servers**: Start in 2-5 seconds each
- **Docker builds**: 10+ minutes - **NEVER CANCEL DOCKER BUILDS** - Use npm dev servers instead for development

## Common Mistakes to Avoid

- **DO NOT** run `npm run test` - it will fail because frontend workspace has no test script
- **DO NOT** use Docker for development - extremely slow builds (10+ minutes)
- **DO NOT** cancel build operations - they complete quickly (6-7 seconds)
- **ALWAYS** ensure API port 3000 visibility is set to "public" in Codespaces to avoid CORS errors
- **DO NOT** modify the existing copilot-instructions.md without validating all commands still work

## Manual Testing After Changes

**Always perform this complete validation sequence after making any changes:**

1. **Clean Build Test**:
   ```bash
   npm run build  # Should complete in ~7 seconds without errors
   ```

2. **API Validation**:
   ```bash
   npm run dev:api  # Start in background
   curl http://localhost:3000/  # Should return "Hello, world!"
   curl http://localhost:3000/api/branches | jq  # Should return JSON array with 2 branches
   # Stop the API server
   ```

3. **Frontend Validation**:
   ```bash
   npm run dev:frontend  # Start in background  
   curl -I http://localhost:5137/  # Should return HTTP/1.1 200 OK
   # Stop the frontend server
   ```

4. **Full Application Test**:
   ```bash
   npm run dev  # Starts both servers
   # Verify both servers start without errors in ~5 seconds
   # Test API and frontend endpoints as above
   # Stop both servers
   ```

5. **Testing and Linting**:
   ```bash
   npm run test:api  # Should pass 6 tests in <1 second
   npm run lint      # Should complete in ~2 seconds with no errors
   ```

## VS Code Integration

### Tasks (Ctrl+Shift+P → "Tasks: Run Task")
- **Build All**: Builds both workspaces
- **Build API**: API workspace only  
- **Build Frontend**: Frontend workspace only

### Debugger (F5)
- **Start API & Frontend**: Launches both servers with integrated terminal

## Docker (Not Recommended for Development)

```bash
# Docker Compose (EXTREMELY SLOW - takes 10+ minutes to build)
docker compose build  # NEVER CANCEL - takes 10+ minutes minimum
docker compose up      # After build completes
```

**Use npm development servers instead of Docker for faster iteration.**

## Key Project Files and Locations

### Frequently Modified Files
- `api/src/routes/*.ts` - API endpoint definitions (e.g., `branch.ts`, `product.ts`)
- `api/src/models/*.ts` - TypeScript interfaces and data models  
- `frontend/src/components/` - React components
- `frontend/src/pages/` - Page-level React components
- `package.json` - Root workspace configuration and scripts
- `api/package.json` - API workspace dependencies and scripts
- `frontend/package.json` - Frontend workspace dependencies and scripts

### Configuration Files
- `.github/copilot-instructions.md` - This file (Copilot agent instructions)
- `.vscode/tasks.json` - VS Code build tasks
- `.vscode/launch.json` - VS Code debug configuration
- `api/tsconfig.json` - API TypeScript configuration
- `frontend/vite.config.ts` - Frontend Vite configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `docker-compose.yml` - Docker orchestration (not recommended for dev)

### Documentation Files
- `docs/architecture.md` - Detailed system architecture
- `docs/build.md` - Additional build and deployment instructions
- `docs/demo-script.md` - Demo presentation scripts
- `README.md` - Project overview and getting started guide

### Testing and Quality
- `api/src/routes/*.test.ts` - API endpoint tests (currently only `branch.test.ts`)
- `api/vitest.config.ts` - Test runner configuration
- `frontend/eslint.config.js` - Frontend linting configuration

## Testing Infrastructure

- **API**: Uses Vitest with Supertest for HTTP testing
- **Frontend**: No tests configured (missing test script)
- **Test files**: Located in `api/src/routes/*.test.ts`
- **Run command**: `npm run test:api` only

## Deployment

- Azure deployment scripts in `infra/configure-deployment.sh`
- Docker configurations for containerized deployment
- GitHub Actions workflow for Copilot setup

## Troubleshooting

- **CORS errors**: Ensure API port 3000 is set to "public" visibility in Codespaces
- **Build failures**: Check Node.js version (requires >=18)
- **Port conflicts**: API uses 3000, Frontend uses 5137
- **Dependencies**: Run `npm install` if packages are missing
