#version 330 core

struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

struct Light2
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

out vec4 color;

uniform vec3 viewPos;
uniform Material material;
uniform Light light;
uniform Light2 light2;

uniform sampler2D texture_diffuse1;

void main()
{
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    //1

    // Ambient
    vec3 ambient = light.ambient * material.diffuse;

    // Diffuse
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * material.diffuse;

    // Specular
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(
        max(dot(viewDir, reflectDir), 0.0),
        material.shininess
    );
    vec3 specular = light.specular * spec * material.specular;

    vec3 result1 = ambient + diffuse + specular;


    //2

    // Ambient
    vec3 ambient2 = light2.ambient * material.diffuse;

    // Diffuse
    vec3 lightDir2 = normalize(light2.position - FragPos);
    float diff2 = max(dot(norm, lightDir2), 0.0);
    vec3 diffuse2 = light2.diffuse * diff2 * material.diffuse;

    // Specular
    vec3 reflectDir2 = reflect(-lightDir2, norm);
    float spec2 = pow(
        max(dot(viewDir, reflectDir2), 0.0),
        material.shininess
    );
    vec3 specular2 = light2.specular * spec2 * material.specular;

    vec3 result2 = ambient2 + diffuse2 + specular2;


    //FINAL
    vec3 result = result1 + result2;

    vec4 texColor = texture(texture_diffuse1, TexCoords);
    color = vec4(result, 1.0) * texColor;
}
