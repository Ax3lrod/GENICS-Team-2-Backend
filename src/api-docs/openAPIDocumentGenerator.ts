import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";

import { authRegistry } from "@/api/auth/authRouter";
import { commentRegistry } from "@/api/comments/commentRouter";
import { lecturerRegistry } from "@/api/lecturer/lecturerRouter";
import { moduleRegistry } from "@/api/module/moduleRouter";
import { userRegistry } from "@/api/user/userRouter";

export function generateOpenAPIDocument() {
  // jangan lupa tambahkan registy
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    lecturerRegistry,
    moduleRegistry,
    userRegistry,
    authRegistry,
    commentRegistry,
  ]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
