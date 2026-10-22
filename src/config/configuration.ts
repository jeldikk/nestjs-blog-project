interface ConfigurationType {
  environment: {
    environment: string;
  };
  database: {
    port: number;
    username: string;
    password: string;
    host: string;
    name: string;
    type: string;
    autoLoadEntities: boolean;
  };
}

export default (): ConfigurationType => ({
  environment: {
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'nestjs_intro',
    type: process.env.DB_TYPE || 'postgres',
    autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
  },
});
