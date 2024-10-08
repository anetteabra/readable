import styles from './SideBar.module.css';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useLibraryStore from '../../store/libraryStore';  //import zustand store


const SideBar = () => {
    const { sortBy, setSortBy, filterBy, toggleFilter } = useLibraryStore();
    return(
        <Card className={styles.sidebar}>
        <CardHeader>
            <CardTitle> Sort and filter your library </CardTitle>
            <CardDescription> Select your preferences below </CardDescription>
        </CardHeader>

        
        <CardContent className={styles.cardContent}>
        {/* Sorting Section */}    
            <div className={styles.sortingSection}>
                <Label className={styles.sortingLabel} htmlFor="sort"> Sort by: </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort"> {sortBy} </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Title"> Title </SelectItem>
                        <SelectItem value="Author"> Author </SelectItem>
                        <SelectItem value="Date"> Popularity </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        
            {/* Filtering Section */}
            <div className={styles.filteringSection}> 
                <Label className={styles.filteringLabel} > Filter by: </Label>
                <div className={styles.filterOptions}> 
                    <div className={styles.filterItems}>
                        <Checkbox id="available" checked={filterBy.available} onCheckedChange={() => toggleFilter('available')} />
                        <Label htmlFor="available"> Available </Label>
                    </div>
                    <div className={styles.filterItems}>
                        <Checkbox id="unavailable" checked={filterBy.unavailable} onCheckedChange={() => toggleFilter('unavailable')} />
                        <Label htmlFor="unavailable"> Unavailable </Label>
                    </div>
                </div>
            </div>
        </CardContent>
        
        <CardFooter className={styles.footer}>
            <p>Card Footer</p>
        </CardFooter>
        </Card>
    )
}

export default SideBar;