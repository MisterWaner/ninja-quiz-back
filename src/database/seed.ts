import { SubjectService } from '../domain/quiz/subject/subject.service';
import { ThemeService } from '../domain/quiz/theme/theme.service';
import { UserService } from '../domain/user/user.service';
import { CreateSubjectInput } from '../domain/quiz/subject/subject.schema';
import { CreateThemeInput } from '../domain/quiz/theme/theme.schema';
import { CreateUserInput } from '../domain/user/user.schema';
import { config } from 'dotenv';

config();

const subjectService = new SubjectService();
const themeService = new ThemeService();
const userService = new UserService();

const subjectsWithThemes: Record<string, string[]> = {
    Mathématiques: [
        'Addition',
        'Multiplication',
        'Soustraction',
        'Calculs aléatoires',
        'Comparaison entiers',
        'Comparaison décimales',
    ],
    Géographie: [
        'Capitales européennes',
        'Capitales américaines',
        'Capitales asiatiques',
        'Capitales océaniques',
        'Capitales africaines',
        'Capitales aléatoires',
        'Drapeaux européens',
        'Drapeaux américains',
        'Drapeaux asiatiques',
        'Drapeaux océaniques',
        'Drapeaux africains',
        'Drapeaux aléatoires',
    ],
    Histoire: ['Dates historiques'],
};

export async function seedDatabase() {
    for (const [subjectName, themes] of Object.entries(subjectsWithThemes)) {
        try {
            const subject: CreateSubjectInput = {
                id: 0,
                name: subjectName,
                path: '',
                themes: [],
            };

            await subjectService.createSubject(subject);

            const createdSubject = (await subjectService.getSubjects()).find(
                (s) => s.name === subjectName
            );
            if (!createdSubject) {
                console.error(`No subject found for ${subjectName}`);
                continue;
            }

            for (const themeName of themes) {
                const theme: CreateThemeInput = {
                    id: '',
                    name: themeName,
                    path: '',
                    subjectId: createdSubject.id,
                };

                await themeService.createTheme(theme);
            }

            console.log(`Seeding done for ${subjectName}`);
        } catch (error) {
            console.error(`Seeding failed for ${subjectName}, error: ${error}`);
        }
    }

    try {
        const username: CreateUserInput['username'] = 'Test';
        const password: CreateUserInput['password'] = process.env
            .TESTERPWD as string;
        const userExist = await userService.getUserByUsername(username);

        if (!userExist) {
            await userService.createUser({ username, password });
            console.log(`✅ User "${username}" created successfully.`);
        } else {
            console.log(`ℹ️ User "${username}" already exists.`);
        }
    } catch (error) {
        console.error(`❌ Error during tester user creation: ${error}`);
    }

    console.log('🌱 Database successfully seeded.');
}
