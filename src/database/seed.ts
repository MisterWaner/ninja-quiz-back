import {SubjectService} from '../modules/subjects/subject.service';
import {ThemeService} from '../modules/themes/theme.service';
import {AuthService} from "../modules/auth/auth.service";
import {UserService} from "../modules/users/user.service";
import {Subject} from '../models/Subject';
import {Theme} from '../models/Theme';
import {User} from '../models/User';
import {config} from 'dotenv'

config()

const subjectService = new SubjectService();
const themeService = new ThemeService();
const userService = new UserService();
const authService = new AuthService();

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
    Histoire: [
        'Dates historiques'
    ]
};

export async function seedDatabase() {
    for (const [subjectName, themes] of Object.entries(subjectsWithThemes)) {
        try {
            const subject: Subject = {
                id: 0,
                name: subjectName,
                subjectPath: '',
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
                const theme: Theme = {
                    id: '',
                    name: themeName,
                    themePath: '',
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
        const username: User["username"] = 'Test';
        const password: User["password"] = process.env.TESTERPWD as string;
        const userExist = await userService.getUserByUsername(username)

        if (!userExist) {
            await authService.registerUser(username, password);
            console.log(`✅ User "${username}" created successfully.`)
        } else {
            console.log(`ℹ️ User "${username}" already exists.`)
        }
    } catch (error) {
        console.error(`❌ Error during tester user creation: ${error}`)
    }

    console.log('🌱 Database successfully seeded.');
}